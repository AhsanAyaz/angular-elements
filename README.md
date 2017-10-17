### experiments with Angular and Web Components

Sketching out hosting Angular Components as Custom Elements / Web Components

##### Note : Scroll down to see development guidelines


#### Angular Component API (4.x)

Angular components are 

```ts

//annotate with metadata about template and styles
@Component({
  selector: 'my-component',
  templateUrl: 'my-component.html',
  styleUrls: [ 'my-component.css' ],
  viewEncapsulation: ViewEncapsulation.Native //Shadow DOM V0
  providers: [ SomeService ],

})
class MyComponent {
  //public API for component consumers
  @Input() someProperty:any; //property values passed in
  @Output() someEvent new EventEmitter(); //events go out

  @ViewChild(ChildComponent) childView:ChildComponent;
  @ViewChildren(ItemComponent) items:QueryList<ItemComponent>

  //bind to host element events
  @HostListener('mousemove', ['$event'])
  onMouseMouse(event:MouseEvent){}

  //bind to host properties and attributes
  @HostBinding('attr.aria-foo') someValue;
  
  //lifecycle events
  ngOnInit(){}
  ngOnChanges(changes){}
  ngDoCheck(){}
  ngOnDestroy(){}

  //view lifecycle events
  ngAfterContentInit(){}
  ngAfterContentChecked(){}
  ngAfterViewInit(){}
  ngAfterViewChecked(){}


}

```


#### Custom Elements v1 API

```ts

class MyCustomElement extends HTMLElement {
  //newable
  constructor(...optionalArgs?:any[]){}

  //attributes to observe changes to
  static get observedAttributes():string[]{ return ['value', 'foo'] }

  //properties
  someProp:string;
  set foo(value:string) { }
  get foo() { return 'foo' }

  //dispatch events
  onClick(){
    this.dispatchEvent(new CustomEvent('some-event', options))
  }

  //called when attributes change
  attributeChangedCallback(attributeName, oldValue, newValue, namespace):void {}

  //called when connected to a document / shadow tree
  connectedCallback():void {}

  //called when removed from document 
  disconnectedCallback():void {}

}

```


#### Development

Install the dependencies

```bash
npm install
#or
yarn
```

Build the demos
```bash
npm run build
```

You can serve the project using any server, for instance [http-server](https://www.npmjs.com/package/http-server)
```bash
http-server ./public

#navigate to localhost:8080
```
