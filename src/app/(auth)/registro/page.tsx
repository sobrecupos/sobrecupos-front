import { SignUpForm } from "@marketplace/features/sign-up-form";
import { authLayoutClasses } from "../classes";

const SignUpPage = ({
  searchParams,
}: {
  searchParams: { referralCode?: string };
}) => (
  <>
    <h1 className={authLayoutClasses.title}>Regístrate</h1>
    <SignUpForm referralCode={searchParams.referralCode} />
  </>
);

export default SignUpPage;
