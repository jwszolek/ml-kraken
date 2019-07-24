import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableConfig } from './table-config.model';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {
  @ViewChild('dt', { static: false }) table;
  data: any;

  @Input() config: TableConfig;

  ngOnInit() {
    if (this.config.subscriber != null) {
      this.loadData();
    }
  }

  loadData() {
    this.config.subscriber.subscribe(items => {
      this.data = JSON.parse(items.body);
      this.data = [...this.data];
      this.table.reset();
    });
  }

  preprocessColumnField(data, columnIndex): string {
    if (this.config.cols[columnIndex].type === 'unix') {
      const date = new Date(data);

      const year = date.getFullYear();
      const month = '0' + date.getMonth();
      const day = '0' + date.getDate();

      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();
      const seconds = '0' + date.getSeconds();
      const formattedTime =
        year +
        '-' +
        month.substr(-2) +
        '-' +
        day.substr(-2) +
        ' ' +
        hours +
        ':' +
        minutes.substr(-2) +
        ':' +
        seconds.substr(-2);

      return formattedTime;
    } else if (this.config.cols[columnIndex].type === 'status') {
      return '';
    } else {
      return data;
    }
  }
}
