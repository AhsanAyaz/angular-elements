import { Component, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class WatchService {
    /**
     * @author Ahsan Ayaz
     * @desc Calculates the units and sets in string format. 
     * @param unit value of the unit in numbers
     * @return {string} the string representation of the unit's value with at least 2 digits
     */
	getTimeString(unit: number): string {
		return (unit ? (unit> 9 ? unit : "0" + unit) : '00').toString();
	}
}


@Component({
	selector: 'stop-watch-app',
	template: `
	  <h1>Stop Watch App</h1>
      <div class="watch-container">
        <stop-watch [hours]="hours" [minutes]="minutes" [seconds]="seconds" [milliseconds]="milliseconds"></stop-watch>
      </div>
      <div class="actions-container">
        <button (click)="start()" [disabled]="isTimerRunning">Start</button>
        <button (click)="stop()" [disabled]="!isTimerRunning">Stop</button>
        <button (click)="clear()" [disabled]="isTimerRunning">Clear</button>
      </div>
	`,
    encapsulation: ViewEncapsulation.Native,
    providers: [ WatchService ],
	styles: [
		`
		:host {
			display: block;
			height: 300px;
			width: 300px;
            margin: 0 auto;
            padding-top: 20px;
        }`,
        `:host h1{
            text-align: center;
            font-family: system-ui;
        }`,
        `
        .watch-container{
            padding: 20px;
        }`,
        `button{
            border-width: 0;
            padding: 10px;
            outline: none;
            border-radius: 2px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
            background-color: #333;
            color: #ecf0f1;
        }`,
        `button[disabled]{
            background-color: #dcdcd;
            color: black;
            opacity: 0.7;
        }`,
        `
        .actions-container{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
        }`
	]
})
export class StopWatchApp {
    private hh = 0;
    private mm = 0;
    private ss = 0;
    private ms = 0;
    hours = '00';
    minutes= '00';
    seconds= '00';
    milliseconds= '00';
    timer: any = null;
    isTimerRunning = false;
	constructor(
        private cdr:ChangeDetectorRef,
        public watchService: WatchService
    ){

    }

    /**
     * @author Ahsan Ayaz
     * @desc Starts the timer, updates ever 10 milliseconds
     */
	start() {
        this.isTimerRunning = true;
        this.cdr.detectChanges(); // changes the states of the buttons right away
        this.timer = setInterval(() => { this.updateTime() }, 10);
    }

    /**
     * @author Ahsan Ayaz
     * @desc Updates the value of the units in for the watchf
     */
    updateTime() {
        this.ms++;
        if (this.ms >= 100) {
            this.ms = 0;
            this.ss++;
            if (this.ss >= 60) {
                this.ss = 0;
                this.mm++;
                if (this.mm >= 60) {
                    this.mm = 0;
                    this.hh++;
                }
            }
        }
        this.setTime();
    }

    /**
     * @author Ahsan Ayaz
     * @desc Updates the time for the watch component.
     * Applies the detected changes.
     */
    setTime() {
        this.hours = this.watchService.getTimeString(this.hh);
        this.minutes = this.watchService.getTimeString(this.mm);
        this.seconds = this.watchService.getTimeString(this.ss);
        this.milliseconds = this.watchService.getTimeString(this.ms);
        this.cdr.detectChanges();
    }

    /**
     * @author Ahsan Ayaz
     * @desc Stops the watch.
     */
    stop() {
        this.isTimerRunning = false;
        clearInterval(this.timer);
        this.cdr.detectChanges();
    }

    /**
     * @author Ahsan Ayaz
     * @desc Clears the time of the watch.
     */
    clear() {
        this.hh = 0;
        this.mm = 0;
        this.ss = 0;
        this.ms = 0;
        this.setTime();
    }

    
}
