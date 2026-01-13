import { DynamicTheme } from "@/components/dynamic-theme";
import { SessionsList } from "@/components/sessions-list";
import { Translated } from "@/components/translated";
import { getAllSessionCookieIds } from "@/lib/cookies";
import { getServiceConfig } from "@/lib/service-url";
import { getBrandingSettings, getDefaultOrg, listSessions, ServiceConfig } from "@/lib/zitadel";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
// import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("accounts");
  return { title: t("title") };
}

async function loadSessions({ serviceConfig }: { serviceConfig: ServiceConfig }) {
  const cookieIds = await getAllSessionCookieIds();

  if (cookieIds && cookieIds.length) {
    const response = await listSessions({ serviceConfig, ids: cookieIds.filter((id) => !!id) as string[],
    });
    return response?.sessions ?? [];
  } else {
    console.info("No session cookie found.");
    return [];
  }
}

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;

  const requestId = searchParams?.requestId;
  const organization = searchParams?.organization;

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let defaultOrganization;
  if (!organization) {
    const org: Organization | null = await getDefaultOrg({ serviceConfig, });
    if (org) {
      defaultOrganization = org.id;
    }
  }

  let sessions = await loadSessions({ serviceConfig });

  const branding = await getBrandingSettings({ serviceConfig, organization: organization ?? defaultOrganization,
  });

  const params = new URLSearchParams();

  if (requestId) {
    params.append("requestId", requestId);
  }

  if (organization) {
    params.append("organization", organization);
  }

  return (
    <DynamicTheme branding={branding}>
      {/* Left Panel - Not used */}
      <div></div>

      {/* Right Panel - Form Content */}
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Select an account
          </h1>
          <p className="text-gray-500 text-sm">
            Choose an account to continue or add a new one.
          </p>
        </div>

        <div className="flex w-full flex-col space-y-2">
          <SessionsList sessions={sessions} requestId={requestId} />
          <Link href={`/loginname?` + params}>
            <div className="flex flex-row items-center rounded-xl px-4 py-3 transition-all border border-gray-200 hover:border-[#6366f1] hover:bg-[#6366f1]/5">
              <div className="mr-4 flex h-10 w-10 flex-row items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white">
                <UserPlusIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                <Translated i18nKey="addAnother" namespace="accounts" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </DynamicTheme>
  );
}
