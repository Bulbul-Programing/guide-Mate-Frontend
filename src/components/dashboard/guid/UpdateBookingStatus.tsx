import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateBookingStatus } from '@/service/Booking/updateBookingStatus';
import { BOOKING_STATUS_FLOW, TBooking } from '@/types/Booking';
import { toast } from 'sonner';

const UpdateBookingStatus = ({ booking }: { booking: TBooking }) => {
    const updateStatus = async (status: string) => {
        const result = await updateBookingStatus(booking, status)

        if (result.success) {
            toast.success(result.message || 'Booking status update successfully')
        }
        else {
        }
    }

    const updateFollow = BOOKING_STATUS_FLOW[booking.status]

    return (
        <div className='flex justify-center'>
            {
                updateFollow.length > 0 ? <Select
                    onValueChange={(value) => updateStatus(value)}
                >
                    <SelectTrigger className='cursor-pointer'>
                        <SelectValue placeholder="Update stats" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup >
                            <SelectLabel>Select Status</SelectLabel>
                            {
                                BOOKING_STATUS_FLOW[booking.status].map((status) => <SelectItem className='cursor-pointer' key={status} value={status}>{status}</SelectItem>)
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select> : <Button disabled className='bg-muted-foreground'>Status not found</Button>
            }
        </div>
    );
};

export default UpdateBookingStatus;