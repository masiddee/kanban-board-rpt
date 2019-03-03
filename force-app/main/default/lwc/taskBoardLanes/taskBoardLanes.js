import { LightningElement, api } from 'lwc';

export default class TaskBoardLanes extends LightningElement {
  @api lane;
  @api tasks;

  renderedCallback() {
    // console.log("Tasks: " + this.tasks);
  }

  handleDragging(event) {
    event.target.classList.add('moving');
    console.log("dragginggggg")
  }
}