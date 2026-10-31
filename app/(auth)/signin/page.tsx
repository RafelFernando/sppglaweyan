import FormSignin from "@/components/auth/form-signin";

export default function SigninPage() {
    return (
        <div className="min-h-screen flex items-center">
            <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
                <FormSignin />
            </div>
        </div>
    );
}