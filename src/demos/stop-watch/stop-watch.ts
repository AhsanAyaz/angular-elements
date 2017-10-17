import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core'

@Component({
	selector: 'stop-watch',
	template: `
        <div class="watch">
            <div class="unit">{{hours}}</div>
            <div class="sep"> : </div>
            <div class="unit">{{minutes}}</div>
            <div class="sep"> : </div>
            <div class="unit">{{seconds}}</div>
            <div class="sep"> : </div>
            <div class="unit">{{milliseconds}}</div>
        </div>
    `,
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
        `:host { 
            background: #2196F3;
            padding: 20px;
            display: block;
            font-family: monospace;
            box-shadow: 0 16px 16px 0 rgba(0,0,0,0.1);
         }`,
        `
        :host .watch{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;
        }`,
        `
        :host .watch .unit, :host .watch .sep{
            font-size: 32px;
            color: #FFEB3B;
        }
        `
    ]
})
export class StopWatch {
    @Input() hours: string;
    @Input() minutes: string;
    @Input() seconds: string;
    @Input() milliseconds: string;
}
