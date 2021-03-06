// See source https://github.com/KillerCodeMonkey/ngx-quill/blob/develop/src/quill-editor.component.ts
// Docs: https://github.com/KillerCodeMonkey/ngx-quill

import { isPlatformServer } from '@angular/common';

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator
} from '@angular/forms';

import { DOCUMENT } from '@angular/common';

// import * as QuillNamespace from 'quill';
// Because quill uses `document` directly, we cannot `import` during SSR
// instead, we load dynamically via `require('quill')` in `ngAfterViewInit()`
declare var require: any;
let Quill: any;

export interface CustomOption {
  import: string;
  whitelist: Array<any>;
}

@Component({
  selector: 'quill-editor', // tslint:disable-line
  template: `
  <ng-content select="[quill-editor-toolbar]"></ng-content>
`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class QuillEditorComponent
  implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy, Validator {
  quillEditor: any;
  editorElem: HTMLElement | null = null;
  emptyArray: any[] = [];
  content: any;
  selectionChangeEvent: any;
  textChangeEvent: any;
  defaultModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [
        { color: this.emptyArray.slice() },
        { background: this.emptyArray.slice() }
      ], // dropdown with defaults from theme
      [{ font: this.emptyArray.slice() }],
      [{ align: this.emptyArray.slice() }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'] // link and image, video
    ]
  };

  @Input() format: 'object' | 'html' | 'text' | 'json' = 'html';
  @Input() theme = 'snow';
  @Input() modules: { [index: string]: object } | null = null;
  @Input() readOnly = false;
  @Input() placeholder = '';
  @Input() maxLength: number | null = null;
  @Input() minLength: number | null = null;
  @Input() required = false;
  @Input() formats: string[] | undefined;
  @Input() style: any = {};
  @Input() strict = true;
  @Input() scrollingContainer: HTMLElement | string | null = null;
  @Input() bounds: HTMLElement | string = document.body;
  @Input() customOptions: CustomOption[] = [];

  /* tslint:disable */
  @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
  @Output() onContentChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
  /* tslint:enable */

  @Input()
  valueGetter = (quillEditor: any, editorElement: HTMLElement) => {
    let html: string | null = editorElement.children[0].innerHTML;
    if (html === '<p><br></p>' || html === '<div><br><div>') {
      html = null;
    }
    let modelValue = html;

    if (this.format === 'text') {
      modelValue = quillEditor.getText();
    } else if (this.format === 'object') {
      modelValue = quillEditor.getContents();
    } else if (this.format === 'json') {
      try {
        modelValue = JSON.stringify(quillEditor.getContents());
      } catch (e) {
        modelValue = quillEditor.getText();
      }
    }

    return modelValue;
  }

  @Input()
  valueSetter = (quillEditor: any, value: any, format: 'object' | 'html' | 'json') => {
    if (this.format === 'html') {
      return quillEditor.clipboard.convert(value);
    } else if (this.format === 'json') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }

    return value;
  }

  onModelChange: any = () => {};
  onModelTouched: any = () => {};

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc: any,
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    private zone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    if (!Quill) {
      try {
        Quill = require('quill');
      } catch {
        return;
      }
    }

    const toolbarElem = this.elementRef.nativeElement.querySelector(
      '[quill-editor-toolbar]'
    );
    const modules: any = this.modules || this.defaultModules;
    let placeholder = 'Insert text here ...';

    if (this.placeholder !== null && this.placeholder !== undefined) {
      placeholder = this.placeholder.trim();
    }

    if (toolbarElem) {
      modules.toolbar = toolbarElem;
    }
    this.elementRef.nativeElement.insertAdjacentHTML(
      'beforeend',
      '<div quill-editor-element></div>'
    );
    this.editorElem = this.elementRef.nativeElement.querySelector(
      '[quill-editor-element]'
    );

    if (this.style) {
      Object.keys(this.style).forEach((key: string) => {
        this.renderer.setStyle(this.editorElem, key, this.style[key]);
      });
    }

    this.customOptions.forEach(customOption => {
      const newCustomOption = Quill.import(customOption.import);
      newCustomOption.whitelist = customOption.whitelist;
      Quill.register(newCustomOption, true);
    });

    this.quillEditor = new Quill(this.editorElem, {
      readOnly: this.readOnly || false,
      theme: this.theme || 'snow',
      formats: this.formats,
      bounds: this.bounds ? (this.bounds === 'self' ? this.editorElem : this.bounds) : this.doc.body,
      strict: this.strict,
      scrollingContainer: this.scrollingContainer,
      modules,
      placeholder
    });

    if (this.content) {
      if (this.format === 'object') {
        this.quillEditor.setContents(this.content, 'silent');
      } else if (this.format === 'text') {
        this.quillEditor.setText(this.content, 'silent');
      } else if (this.format === 'json') {
        try {
          this.quillEditor.setContents(JSON.parse(this.content), 'silent');
        } catch (e) {
          this.quillEditor.setText(this.content, 'silent');
        }
      } else {
        const contents = this.quillEditor.clipboard.convert(this.content);
        this.quillEditor.setContents(contents, 'silent');
      }

      this.quillEditor.history.clear();
    }

    this.onEditorCreated.emit(this.quillEditor);

    // mark model as touched if editor lost focus
    this.selectionChangeEvent = this.quillEditor.on(
      'selection-change',
      (range: any, oldRange: any, source: string) => {
        this.zone.run(() => {
          this.onSelectionChanged.emit({
            editor: this.quillEditor,
            range,
            oldRange,
            source
          });

          if (!range) {
            this.onModelTouched();
          }
        });
      }
    );

    // update model if text changes
    this.textChangeEvent = this.quillEditor.on(
      'text-change',
      (delta: any, oldDelta: any, source: string) => {

        const text = this.quillEditor.getText();
        const content = this.quillEditor.getContents();

        let html: string | null = this.editorElem?.children[0].innerHTML || null;
        if (html === '<p><br></p>' || html === '<div><br><div>') {
          html = null;
        }

        this.zone.run(() => {
          if (!this.editorElem) { return; }

          this.onModelChange(
            this.valueGetter(this.quillEditor, this.editorElem)
          );

          this.onContentChanged.emit({
            editor: this.quillEditor,
            html,
            text,
            content,
            delta,
            oldDelta,
            source
          });
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.selectionChangeEvent) {
      this.selectionChangeEvent.removeListener('selection-change');
    }
    if (this.textChangeEvent) {
      this.textChangeEvent.removeListener('text-change');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.quillEditor) {
      return;
    }
    if (changes.readOnly) {
      this.quillEditor.enable(!changes.readOnly.currentValue);
    }
    if (changes.placeholder) {
      this.quillEditor.root.dataset.placeholder =
        changes.placeholder.currentValue;
    }
  }

  writeValue(currentValue: any): void {
    this.content = currentValue;

    if (this.quillEditor) {
      if (currentValue) {
        if (this.format === 'text') {
          this.quillEditor.setText(currentValue);
        } else {
          this.quillEditor.setContents(
            this.valueSetter(this.quillEditor, this.content, this.format)
          );
        }
        return;
      }
      this.quillEditor.setText('');
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  validate(): any {
    if (!this.quillEditor) {
      return null;
    }

    const err: {
        minLengthError?: { given: number; minLength: number };
        maxLengthError?: { given: number; maxLength: number };
        requiredError?: { empty: boolean };
      } = {};
    let valid = true;

    const textLength = this.quillEditor.getText().trim().length;

    if (this.minLength && textLength && textLength < this.minLength) {
      err.minLengthError = {
        given: textLength,
        minLength: this.minLength
      };

      valid = false;
    }

    if (this.maxLength && textLength > this.maxLength) {
      err.maxLengthError = {
        given: textLength,
        maxLength: this.maxLength
      };

      valid = false;
    }

    if (this.required && !textLength) {
      err.requiredError = {
        empty: true
      };

      valid = false;
    }

    return valid ? null : err;
  }
}
