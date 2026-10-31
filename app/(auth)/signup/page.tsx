import FormRegister from "@/components/auth/form-signup";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center">
            <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
                <FormRegister />
            </div>
        </div>
    );
}