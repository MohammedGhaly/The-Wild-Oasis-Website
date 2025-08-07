"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to update your profile.");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid national ID format.");

  const updatedFields = {
    nationalID,
    nationality,
    countryFlag,
  };
  const { error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", session.user.guestId);

  revalidatePath("/account/profile");

  if (error) {
    console.log(error.message);
    throw new Error("Guest could not be updated");
  }
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.log(error.message);
    throw new Error("Reservation could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const updatedFields = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 500),
  };
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", formData.get("reservationId"))
    .eq("guestId", formData.get("guestId"))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${formData.get("reservationId")}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}
