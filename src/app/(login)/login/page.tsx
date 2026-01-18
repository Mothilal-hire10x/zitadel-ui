import { redirect } from "next/navigation";

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;
  
  // Get all query parameters and forward them to loginname
  const params = new URLSearchParams();
  
  // Map authRequest to requestId (ZITADEL uses authRequest, the app uses requestId)
  if (searchParams.authRequest) {
    params.set("requestId", searchParams.authRequest);
  }
  
  // Forward other common parameters
  if (searchParams.organization) {
    params.set("organization", searchParams.organization);
  }
  if (searchParams.loginName) {
    params.set("loginName", searchParams.loginName);
  }
  
  const queryString = params.toString();
  const redirectUrl = queryString ? `/loginname?${queryString}` : "/loginname";
  
  redirect(redirectUrl);
}
