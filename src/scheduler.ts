import { add, addMinutes } from 'date-fns';

export type TaskType = 'make' | 'serve' | 'break';

export interface NewOrder {
  recipient: string;
}

export interface Task {
  recipient: string;
  taskType: TaskType;
  time: Date;
  sequence?: number;
}

export class Scheduler {
  tasks: Task[];

  constructor(initialTasks: Task[] = []) {
    this.tasks = initialTasks;
  }

  scheduleNewOrder(newOrder: NewOrder): void {
    let whenToMake;

    if (this.tasks.length) {
      const [ lastTask ] = this.tasks.slice(-1);
      whenToMake = addMinutes(lastTask.time, 1);
    } else {
      whenToMake = new Date();
    }
    
    const whenToServe = add(whenToMake, { minutes: 2, seconds: 30 });
    this.tasks.push({ recipient: newOrder.recipient, taskType: 'make', time: whenToMake });
    this.tasks.push({ recipient: newOrder.recipient, taskType: 'serve', time: whenToServe });
  }

  getScheduledTasks(): Task[] {
    if (this.tasks.length) {
      const scheduledTasks = this.tasks.map<Task>((task, i) => ({ ...task, sequence: i + 1 }));
      
      const [ lastTask ] = scheduledTasks.slice(-1);
      const breakTime = addMinutes(lastTask.time, 1);
  
      scheduledTasks.push({ recipient: null, taskType: 'break', time: breakTime, sequence: this.tasks.length + 1 });
      return scheduledTasks;
    } else {
      return [ { recipient: null, taskType: 'break', time: new Date(), sequence: 1 } ];
    }
  }
}
