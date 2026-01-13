import { Alert } from "@/components/alert";
import { BackButton } from "@/components/back-button";
import { ChooseSecondFactor } from "@/components/choose-second-factor";
import { DynamicTheme } from "@/components/dynamic-theme";
import { Translated } from "@/components/translated";
import { UserAvatar } from "@/components/user-avatar";
import { getSessionCookieById } from "@/lib/cookies";
import { getServiceConfig } from "@/lib/service-url";
import { loadMostRecentSession } from "@/lib/session";
import { getBrandingSettings, getSession, listAuthenticationMethodTypes } from "@/lib/zitadel";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("mfa");
  return { title: t("verify.title") };
}

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;

  const { loginName, requestId, organization, sessionId } = searchParams;

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  const sessionFactors = sessionId
    ? await loadSessionById(serviceConfig.baseUrl, sessionId, organization)
    : await loadSessionByLoginname(serviceConfig.baseUrl, loginName, organization);

  async function loadSessionByLoginname(serviceUrl: string, loginName?: string, organization?: string) {
    return loadMostRecentSession({ serviceConfig, sessionParams: {
        loginName,
        organization,
      },
    }).then((session) => {
      if (session && session.factors?.user?.id) {
        return listAuthenticationMethodTypes({ serviceConfig, userId: session.factors.user.id,
        }).then((methods) => {
          return {
            factors: session?.factors,
            authMethods: methods.authMethodTypes ?? [],
          };
        });
      }
    });
  }

  async function loadSessionById(host: string, sessionId: string, organization?: string) {
    const recent = await getSessionCookieById({ sessionId, organization });
    return getSession({ serviceConfig, sessionId: recent.id,
      sessionToken: recent.token,
    }).then((response) => {
      if (response?.session && response.session.factors?.user?.id) {
        return listAuthenticationMethodTypes({ serviceConfig, userId: response.session.factors.user.id,
        }).then((methods) => {
          return {
            factors: response.session?.factors,
            authMethods: methods.authMethodTypes ?? [],
          };
        });
      }
    });
  }

  const branding = await getBrandingSettings({ serviceConfig, organization,
  });

  return (
    <DynamicTheme branding={branding}>
      {/* Left Panel - Not used */}
      <div></div>

      {/* Right Panel - Form Content */}
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Two-factor authentication
          </h1>
          <p className="text-gray-500 text-sm">
            Choose a method to verify your identity.
          </p>
        </div>

        {sessionFactors && (
          <UserAvatar
            loginName={loginName ?? sessionFactors.factors?.user?.loginName}
            displayName={sessionFactors.factors?.user?.displayName}
            showDropdown
            searchParams={searchParams}
          ></UserAvatar>
        )}

        {!(loginName || sessionId) && (
          <Alert>
            <Translated i18nKey="unknownContext" namespace="error" />
          </Alert>
        )}

        {sessionFactors ? (
          <ChooseSecondFactor
            loginName={loginName}
            sessionId={sessionId}
            requestId={requestId}
            organization={organization}
            userMethods={sessionFactors.authMethods ?? []}
          ></ChooseSecondFactor>
        ) : (
          <Alert>
            <Translated i18nKey="verify.noResults" namespace="mfa" />
          </Alert>
        )}

        <div className="flex w-full flex-row items-center pt-4">
          <BackButton />
          <span className="flex-grow"></span>
        </div>
      </div>
    </DynamicTheme>
  );
}
