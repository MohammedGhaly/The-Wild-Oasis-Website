"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { isPagesAPIRouteMatch } from "next/dist/server/future/route-matches/pages-api-route-match";

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

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation.");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
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

export async function updateBooking(formData) {
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
