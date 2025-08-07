import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
  description: "Account page",
};

export default async function Page() {
  const session = await auth();
  console.log("id=> ", session.user.guestId);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {session?.user?.name.split(" ")[1]}!
      </h2>
    </div>
  );
}
