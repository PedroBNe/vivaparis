import { format } from 'date-fns'

export default function formatDate(date: string | number | Date) {
    const dateFor = format(new Date(date), "MM/dd/yyyy")

    return(dateFor)
}