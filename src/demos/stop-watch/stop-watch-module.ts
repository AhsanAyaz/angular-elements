import { NgModule } from '@angular/core'
import { NgDirectivesModule } from '../../directives/ng_directives'
import { StopWatchApp } from './stop-watch.app';
import { StopWatch } from './stop-watch';

@NgModule({
  id: 'stop-watch-app',
  imports: [ NgDirectivesModule ],
	declarations: [ StopWatchApp, StopWatch ]
})
export class StopWatchAppModule {}
