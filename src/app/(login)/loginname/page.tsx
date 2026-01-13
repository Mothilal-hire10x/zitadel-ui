import { DynamicTheme } from "@/components/dynamic-theme";
import { SignInWithIdp } from "@/components/sign-in-with-idp";
import { UsernameForm } from "@/components/username-form";
import { getServiceConfig } from "@/lib/service-url";
import { getActiveIdentityProviders, getBrandingSettings, getDefaultOrg, getLoginSettings } from "@/lib/zitadel";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("loginname");
  return { 
    title: t("title") + " | 10XScale.ai",
    description: "Sign in to your 10XScale.ai account - AI-powered professional journey transformation"
  };
}

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;

  const loginName = searchParams?.loginName;
  const requestId = searchParams?.requestId;
  const organization = searchParams?.organization;
  const suffix = searchParams?.suffix;
  const submit: boolean = searchParams?.submit === "true";

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let defaultOrganization;
  if (!organization) {
    const org: Organization | null = await getDefaultOrg({ serviceConfig, });
    if (org) {
      defaultOrganization = org.id;
    }
  }

  const loginSettings = await getLoginSettings({ serviceConfig, organization: organization ?? defaultOrganization,
  });

  const contextLoginSettings = await getLoginSettings({ serviceConfig, organization,
  });

  const identityProviders = await getActiveIdentityProviders({ serviceConfig, orgId: organization ?? defaultOrganization,
  }).then((resp) => {
    return resp.identityProviders;
  });

  const branding = await getBrandingSettings({ serviceConfig, organization: organization ?? defaultOrganization,
  });

  return (
    <DynamicTheme branding={branding}>
      {/* Left Panel Content - Not used in this layout */}
      <div></div>

      {/* Right Panel - Form Content */}
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-500 text-sm">
            Please enter your username or email to continue.
          </p>
        </div>

        {/* Login Form */}
        <UsernameForm
          loginName={loginName}
          requestId={requestId}
          organization={organization}
          loginSettings={contextLoginSettings}
          suffix={suffix}
          submit={submit}
          allowRegister={!!loginSettings?.allowRegister}
        />

        {/* Social Login */}
        {loginSettings?.allowExternalIdp && !!identityProviders?.length && (
          <div className="w-full pt-2">
            <SignInWithIdp
              identityProviders={identityProviders}
              requestId={requestId}
              organization={organization}
              postErrorRedirectUrl="/loginname"
              showLabel={true}
            />
          </div>
        )}
      </div>
    </DynamicTheme>
  );
}
