import { LightningElement, api } from 'lwc';

export default class TaskBoardLanes extends LightningElement {
  @api lane;
  @api tasks;

  taskNewLaneStatus;

  renderedCallback() {
    // console.log("Tasks: " + this.tasks);
  }

  handleDragging(event) {
    event.target.classList.add('moving');
    // console.log(JSON.stringify(event.prototype.composedPath()));
  }

  handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragged-over');
  }

  handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragged-over');
  }

  handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragged-over');

    this.taskNewLaneStatus = event.currentTarget.dataset.lane;
    console.log("handleDrop method: " + this.taskNewLaneStatus);
    this.template.querySelector('c-task-card.moving').newLane(this.taskNewLaneStatus);
    this.template.querySelector('c-task-card.moving').classList.remove('moving');
  }

  handleTaskUpdate(event) {
    const selectedEvent = new CustomEvent('updatedtask', {
      detail: { 
        taskId: event.detail.taskId, 
        oldStatus: event.detail.oldStatus,
        newStatus: this.taskNewLaneStatus
      },
      bubbles: true
    });
    this.dispatchEvent(selectedEvent);
  }
}