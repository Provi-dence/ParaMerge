import { Component, OnInit } from '@angular/core';
import { EventService } from '@app/_services';
import { CommunityEvent } from '@app/_models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {
  events: CommunityEvent[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe(
      (data: CommunityEvent[]) => {
        this.events = data;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  approveEvent(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.approve(id).subscribe(
          (response: CommunityEvent) => {
            this.updateEventStatus(id, 'Approved');
            Swal.fire('Approved!', 'The event has been approved.', 'success');
          },
          error => {
            console.error('Error approving event:', error);
            Swal.fire('Error', 'Failed to approve the event.', 'error');
          }
        );
      }
    });
  }

  rejectEvent(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.reject(id).subscribe(
          (response: CommunityEvent) => {
            this.updateEventStatus(id, 'Rejected');
            Swal.fire('Rejected!', 'The event has been rejected.', 'success');
          },
          error => {
            console.error('Error rejecting event:', error);
            Swal.fire('Error', 'Failed to reject the event.', 'error');
          }
        );
      }
    });
  }

  private updateEventStatus(id: number, approvalStatus: string): void {
    const event = this.events.find(c => c.Event_ID === id);
    if (event) {
      event.Event_ApprovalStatus = approvalStatus;
      event.Event_Status = approvalStatus === 'Approved' ? 1 : 0;
    }
  }

  getEventStatus(status: number): string {
    return status === 1 ? 'Active' : 'Inactive';
  }
}
