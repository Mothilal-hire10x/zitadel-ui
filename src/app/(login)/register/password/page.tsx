import { DynamicTheme } from "@/components/dynamic-theme";
import { SetRegisterPasswordForm } from "@/components/set-register-password-form";
import { Translated } from "@/components/translated";
import { getServiceConfig } from "@/lib/service-url";
import {
  getBrandingSettings,
  getDefaultOrg,
  getLegalAndSupportSettings,
  getLoginSettings,
  getPasswordComplexitySettings,
} from "@/lib/zitadel";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { headers } from "next/headers";

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;

  let { firstname, lastname, email, organization, requestId } = searchParams;

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  if (!organization) {
    const org: Organization | null = await getDefaultOrg({ serviceConfig, });
    if (org) {
      organization = org.id;
    }
  }

  const missingData = !firstname || !lastname || !email || !organization;

  const legal = await getLegalAndSupportSettings({ serviceConfig, organization,
  });
  const passwordComplexitySettings = await getPasswordComplexitySettings({ serviceConfig, organization,
  });

  const branding = await getBrandingSettings({ serviceConfig, organization,
  });

  const loginSettings = await getLoginSettings({ serviceConfig, organization,
  });

  return missingData ? (
    <DynamicTheme branding={branding}>
      {/* Left Panel - Not used */}
      <div></div>
      
      {/* Right Panel */}
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Missing information
          </h1>
          <p className="text-gray-500 text-sm">
            <Translated i18nKey="missingdata.description" namespace="register" />
          </p>
        </div>
      </div>
    </DynamicTheme>
  ) : loginSettings?.allowRegister && loginSettings.allowUsernamePassword ? (
    <DynamicTheme branding={branding}>
      {/* Left Panel - Not used */}
      <div></div>

      {/* Right Panel - Form Content */}
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Set your password
          </h1>
          <p className="text-gray-500 text-sm">
            Create a secure password for your account.
          </p>
        </div>

        {/* Form */}
        {legal && passwordComplexitySettings && (
          <SetRegisterPasswordForm
            passwordComplexitySettings={passwordComplexitySettings}
            email={email}
            firstname={firstname}
            lastname={lastname}
            organization={organization as string}
            requestId={requestId}
          />
        )}
      </div>
    </DynamicTheme>
  ) : (
    <DynamicTheme branding={branding}>
      {/* Left Panel - Not used */}
      <div></div>
      
      {/* Right Panel */}
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Registration disabled
          </h1>
          <p className="text-gray-500 text-sm">
            <Translated i18nKey="disabled.description" namespace="register" />
          </p>
        </div>
      </div>
    </DynamicTheme>
  );
}
