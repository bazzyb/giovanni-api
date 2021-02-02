import { expect } from 'chai';
import { parseISO, isEqual, differenceInSeconds } from 'date-fns';

import { Scheduler, NewOrder, Task } from '../scheduler';

describe('Order Functions', () => {
  const newOrder: NewOrder = { recipient: 'Anisa' };

  const oneOrder: Task[] = [ 
    {
      recipient: 'Stavros',
      taskType: 'make',
      time: parseISO('2021-02-01 14:00:00')
    }, 
    {
      recipient: 'Stavros',
      taskType: 'serve',
      time: parseISO('2021-02-01 14:02:30')
    } 
  ];
  
  describe('scheduleNewTask', () => {
    const scheduler = new Scheduler();
    scheduler.scheduleNewOrder(newOrder);

    it('scheduled tasks length should be 2', () => {
      expect(scheduler.tasks.length).to.be.equal(2);
    });
    it('should have a make and a serve task', () => {
      expect(scheduler.tasks[0].taskType).to.be.equal('make');
      expect(scheduler.tasks[1].taskType).to.be.equal('serve');
    });
    it('serve should be 2.5 minutes after make', () => {
      const diffInSeconds = differenceInSeconds(scheduler.tasks[1].time, scheduler.tasks[0].time);
      expect(diffInSeconds).to.be.equal(150);
    });
  });

  describe('getScheduledTasks', () => {
    describe('No Pending Orders', () => {
      const scheduler = new Scheduler();
      const tasks = scheduler.getScheduledTasks();
      
      it('should return 1 task with type of "break"', () => {
        expect(tasks.length).to.equal(1);
      });
      it('should have no recipient', () => {
        expect(tasks[0].recipient).to.be.null;
      });
      it('should be taskType: "break"', () => {
        expect(tasks[0].taskType).to.equal('break');
      });
    });

    describe('One Pending Order', () => {
      const scheduler = new Scheduler(oneOrder);
      const tasks = scheduler.getScheduledTasks();
      
      it('should return 3 tasks', () => {
        expect(tasks.length).to.equal(3);
      });
      it('last task should be a break', () => {
        expect(tasks[2].taskType).to.be.equal('break');
      });
      it('break should be scheduled for "14:03:30"', () => {
        const comparedTime = isEqual(tasks[2].time, parseISO('2021-02-01 14:03:30'));
        expect(comparedTime).to.be.true;
      });
    });
  });
});
