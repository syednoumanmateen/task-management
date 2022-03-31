import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "myFilter",
  pure: false,
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(
      (item) => item.moduleName.indexOf(filter["moduleName"]) !== -1
    );
  }
}
