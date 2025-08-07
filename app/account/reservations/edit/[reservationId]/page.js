import UpdateReservationSubmitButton from "@/app/_components/UpdateReservationSubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { reservationId } = params;
  const session = await auth();

  const guestBookings = await getBookings(session.user.guestId);
  console.log("bookings =>", guestBookings);
  if (guestBookings.map((b) => b.id).indexOf(Number(reservationId)) === -1) {
    throw new Error("You are not allowed to edit this reservation.");
  }

  const booking = await getBooking(reservationId);
  const cabin = await getCabin(booking.cabinId);
  console.log("booking => ", booking);
  console.log("cabin => ", cabin);

  const maxCapacity = cabin.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateReservation}
      >
        <input type="hidden" value={reservationId} name="reservationId" />
        <input type="hidden" value={session.user.guestId} name="guestId" />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <UpdateReservationSubmitButton />
        </div>
      </form>
    </div>
  );
}
