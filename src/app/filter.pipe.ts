import { Pipe, PipeTransform } from '@angular/core';
import { User } from './model/userModel';
import { Feedback } from './model/feedbackModel';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: readonly any[], searchText: string): readonly any[] {

    // return empty array if array is falsy
    if (!items) { 
        return [];
     }

    // return the original array if search text is empty
    if (!searchText) { 
        return items;
    }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // return the filtered array
    const filteredItems = items.filter(item => {
        
        if(item instanceof User){
            return(
                item.id.toString().toLowerCase().includes(searchText) ||
                item.name.toLowerCase().includes(searchText) ||
                item.username.toLowerCase().includes(searchText) ||
                item.tpNoStaffId?.toLowerCase().includes(searchText) ||
                item.email.toLowerCase().includes(searchText) ||
                item.phoneNumber.toLowerCase().includes(searchText) ||
                item.dob?.toLowerCase().includes(searchText) ||
                item.gender.toLowerCase().includes(searchText)
            );
        }
        else if(item instanceof Feedback){
            return(
                item.id.toString().toLowerCase().includes(searchText) ||
                item.name.toString().toLowerCase().includes(searchText) ||
                item.email.toString().toLowerCase().includes(searchText) ||
                item.comment.toString().toLowerCase().includes(searchText) ||
                item.date.toString().toLowerCase().includes(searchText)         
            );
        }
        else{
            return(
                item.BookingID.toLowerCase().includes(searchText) || 
                item.Username.toLowerCase().includes(searchText) ||
                item.RoomName.toLowerCase().includes(searchText) || 
                item.RoomType.toLowerCase().includes(searchText) ||
                item.NoOfUsers.toLowerCase().includes(searchText) ||
                item.BookingDate.toLowerCase().includes(searchText) ||
                item.StartTime.toLowerCase().includes(searchText) ||
                item.EndTime.toLowerCase().includes(searchText) ||
                item.equipmentNames?.toLowerCase().includes(searchText) || 
                item.refreshmentNames?.toLowerCase().includes(searchText) ||
                item.TotalPayment.toLowerCase().includes(searchText) ||
                item.BookingStatus.toLowerCase().includes(searchText) ||
                item.Feedback.toLowerCase().includes(searchText)
            )
        }
    });
    return filteredItems;
   }
}
