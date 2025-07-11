import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponentComponent } from '../../../core/table-component/table-component.component';

import { GlobalListComponent } from 'src/app/shared/global-list';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, AlertService } from 'src/app/services';
import { MatTableDataSource } from '@angular/material/table';
@Component({
	selector: 'app-organisation-contracted',
	templateUrl: './organisation-contracted.component.html',
	styleUrls: ['./organisation-contracted.component.scss']
})
export class OrganisationContractedComponent extends GlobalListComponent implements OnInit
{

	title = "Contracted Organisation"
	tableConfigAndProps = {};
	dataSource = new MatTableDataSource();


	inputData = {
		'imageColumn': 'contractImage',
		'actionColumn': 'Actions',
		'expandColumn': 'expandable',
		'firstColumn': 'No.',
		'lastColumn': '',
		'roundedTable': true,
		'hasSwitch': false,
		'buttonEvent': 'output'
	}
	buttons = [
		{ buttonLabel: "Approve", color: "#00B52A", buttonStatus: "approved" },
		{ buttonLabel: "Partial Approve", color: "#FF6C00", buttonStatus: "partaillyApproved" },
		{ buttonLabel: "Reject", color: "red", buttonStatus: "rejected" },
	]



	columnHeader = {
		'serialNumber': 'No.', 'id': 'ID', 'organization': 'Org Name', 'nursery': 'Nursery Name',
		'dateTime': 'Date', 'typeEn': 'Type', 'quantity': 'Requested Qty',
		'contractImage': 'Contract Photo', 'Actions': 'Actions', 'expandable': ''
	};

	constructor(protected router: Router, protected apiService: ApiService,
		protected _route: ActivatedRoute, protected alertService: AlertService,)
	{

		super(router, apiService, alertService);
		this.tableConfigAndProps = {
			ActionButtons: this.buttons,
			inputData: this.inputData, columnHeader: this.columnHeader, dataSource: this.dataSource,
		};
		this.filterArray = [
			{
				label: 'Filter by Status', type: 'filter', key: 'processingStatusEn', selected: 'pending',
				options: [
					// { key: 'All', value: 'All', label: 'All' },
					{ key: 'processingStatusEn', value: 'pending', label: 'Pending' },
					{ key: 'processingStatusEn', value: 'approved', label: 'Approved' },
					{ key: 'processingStatusEn', value: 'partaillyApproved', label: 'Partially Approved' },
					{ key: 'processingStatusEn', value: 'rejected', label: 'Rejected' }
				]
			},
		]

		this.listApi = 'admin/fetch/sampling-requests?perPage=10'
		// this.getList()
		super.ngOnInit();
	}

	afterListResponse(): void
	{
		this.title = "Contracted Organisation"
		this.filterData()
		console.log(this.dataItems)
		this.tableConfigAndProps = {
			ActionButtons: this.buttons,
			inputData: this.inputData,
			columnHeader: this.columnHeader,
			dataSource: new MatTableDataSource(this.dataItems),
			pagination: this.pagination
		};
		this.title = this.title + " (" + this.pagination.count + ")"

	}
	filterData()
	{
		this.dataItems.forEach(element =>
		{
			element.organization = element.organization?.nameEn
			element.nursery = element.nursery?.nameEn
			element['name'] = element.organization
			if (element.samplingRequestItems.length > 1)
			{
				element["typeEn"] = 'Multiple';
				element["expanded"] = 'false';
			}
			else if (element.samplingRequestItems.length == 1)
			{
				element["typeEn"] = 'Single';
				element["expanded"] = 'false';

			}
		});


	}


}
