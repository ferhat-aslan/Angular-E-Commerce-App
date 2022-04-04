import { Pipe, PipeTransform } from '@angular/core';
//created a pipe for searching process.
@Pipe({
  name: 'filter' //this pipe will call with this name.
})
export class SearchPipe implements PipeTransform {
//value is filter, we use searchTerm for search, propname is for key.
  transform(value : any[], searchTerm: string, propName:string): any[] {
    const result:any =[];
    if(!value || searchTerm==='' || null || undefined || propName ===''){
      return value;
    }
    value.forEach((a:any)=>{
      //all char converted to lowercase for the search.
      if(a[propName].trim().toLowerCase().includes(searchTerm.toLowerCase())){
        result.push(a);
      }
    });
    return result;
  }

}
