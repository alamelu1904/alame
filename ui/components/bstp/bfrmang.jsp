<form role="form" name="searchForm" class="form-horizontal">
    <a id="download" />
    <div class="row">
        <div class="col-md-12" ng-repeat="rows in rowGroup">
            <div class="row" ng-repeat="row in rows">
                <div id="{{schemeDetails.schemelD}}_{{field.actualFieldName}}_SrchFid" ng-class="getColStyle('column')" ng-repeat="field in row">
                    <label ng-class="getColStyle('label')" title="{{field.fieldDesc}}" style="width: 35%; padding-top: 5px; padding-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        {{field.fieldDesc}}
                    </label>
                    
                    <div ng-class="getColStyle('value')" style="width: 65%; padding-top: 5px; padding-bottom: 5px;" ng-if="field.displayType == 'string:text:false' || field.displayType == 'integer:text:false' || field.displayType == 'string:null:false'">
                        <div ng-class="{'has-error': searchForm.{{field.fieldName}}.$invalid && formInvalid}">
                            <input type="text" name="{{field.fieldName}}" ng-model="searchFormData[field.fieldName]" ng-init="searchFormData[field.fieldName] = field.data" ng-readonly="{{field.readOnly}}" class="form-control" placeholder="Enter {{field.fieldDesc}}" gtm-validator="{{field.dataType}}, {{field.upperCase}}, {{field.lowerCase}}" />
                        </div>
                    </div>
                    
                    <div ng-class="getColStyle('value')" style="width: 65%; padding-top: 5px; padding-bottom: 5px;" ng-if="field.displayType == 'string:radio:false'">
                        <div ng-class="{'has-error': searchForm.{{field.fieldName}}.$invalid && formInvalid}">
                            <span ng-repeat="opt in field.fieldLoV">
                                <input type="radio" name="{{field.fieldName}}" ng-model="searchFormData[field.fieldName]" value="{{opt.paramValue}}" ng-init="searchFormData[field.fieldName] = field.selectedData" ng-readonly="{{field.readOnly}}" /> &nbsp; {{opt.paramDesc}} <br/>
                            </span>
                        </div>
                    </div>
                    
                    <div ng-class="getColStyle('value')" style="width: 65%; padding-top: 5px; padding-bottom: 5px;" ng-if="field.displayType == 'null:text:false'">
                        <div ng-class="{'has-error': searchForm.{{field.fieldName}}.$invalid && formInvalid}">
                            <input type="text" name="{{field.fieldName}}" ng-model="searchFormData[field.fieldName]" ng-readonly="{{field.readOnly}}" ng-init="searchFormData[field.fieldName] = field.data" class="form-control" placeholder="Enter {{field.fieldDesc}}" />
                        </div>
                    </div>
                    
                    <div ng-class="getColStyle('value')" style="width: 65%; padding-top: 5px; padding-bottom: 5px;" ng-if="field.displayType == 'double:text:false'">
                        <div ng-class="{'has-error': searchForm.{{field.fieldName}}.$invalid && formInvalid}">
                            <input type="text" name="{{field.fieldName}}" ng-model="searchFormData[field.fieldName]" ng-readonly="{{field.readOnly}}" ng-init="searchFormData[field.fieldName] = field.data" class="form-control" placeholder="Enter {{field.fieldDesc}}" />
                        </div>
                    </div>
                    
                    <div ng-class="getColStyle('value')" style="width: 65%; padding-top: 5px; padding-bottom: 5px;" ng-if="field.displayType == 'string:select:false' || field.displayType == 'null:select:false'">
                        <div ng-class="{'has-error': searchForm.{{field.fieldName}}.$invalid && formInvalid}">
                            <select name="{{field.fieldName}}" class="form-control" ng-model="searchFormData[field.fieldName]" ng-readonly="{{field.readOnly}}" ng-init="searchFormData[field.fieldName] = field.selectedData" ng-options="item.paramValue as item.paramDesc for item in field.fieldLov" ng-if="field.fieldName != 'recordState'">
                                <option value=""></option>
                            </select>
                            <select name="{{field.fieldName}}" class="form-control" ng-model="searchFormData[field.fieldName]" ng-readonly="{{field.readOnly}}" ng-init="searchFormData[field.fieldName] = field.selectedData" ng-options="key as label for (key, label) in field.statesMap" ng-if="field.fieldName == 'recordState'">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    
                    <div ng-class="getColStyle('value')" style="width: 65%; padding-top: 2px; padding-bottom: 2px;" ng-controller="DatepickerCtrl" ng-if="field.displayType == 'date:text:false' && field.enableDateRange">
                        <div class="row" style="margin-left: 0px; margin-right: 0px;">
                            <div class="col-xs-1" style="padding-left: 0px; padding-right: 0px;">
                                <label style="text-overflow: ellipsis;" title="From">From</label>
                            </div>
                            <div ng-controller="DatepickerCtrl" class="col-xs-5" style="padding-left: 10px; padding-right: 0px;">
                                <div ng-class="{'has-error': (searchForm.{{field.fieldName}}_From.$invalid && formInvalid)}">
                                    <p class="input-group" style="display: table-footer-group;">
                                        <input type="text" name="{{field.fieldName}}_From" class="form-control" style="padding-left: 0px; padding-right: 0px;" id="{{field.fieldName}}" ng-change="_validateFromDate(searchForm.{{field.fieldName}}_From)" ng-model="searchFormData[field.fieldName+'_From']" ng-readonly="{{field.readOnly}}" ng-init="searchFormData[field.fieldName+'_From'] = initDate(field)" datepicker-popup="{{format}}" is-open="opened" datepicker-options="dateOptions" placeholder="Select {{field.fieldDesc}}" close-text="Close" show-button-bar="false" gtm-date />
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-default" style="padding: 1px 4px;" ng-click="clearCalendar(searchForm[field.fieldName+'_From'])">
                                                <i class="glyphicon glyphicon-remove"></i>
                                            </button>
                                            <button type="button" class="btn btn-default" style="padding: 1px 4px;" ng-click="open($event, true)">
                                                <i class="glyphicon glyphicon-calendar"></i>
                                            </button>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button name="createTemplateButton" class="btn btn-sm btn-primary" ng-click="createTemplate()">
                        <i class="glyphicon glyphicon-file"></i>&nbsp;<span translate="rdm.button.CreateTemplate" translate-default="Create Template"></span>&nbsp;
                    </button>

                    <button class="btn btn-sm btn-primary" ng-click="reset()">
                        <i class="glyphicon glyphicon-repeat"></i>&nbsp;<span translate="rdm.button.Reset" translate-default="Reset"></span>&nbsp;
                    </button>

                    <button name="saveSearchTemplate" class="btn btn-sm btn-primary" ng-if="showSaveSearchQueryButton" ng-click="saveSearchTemplate()">
                        <i class="glyphicon glyphicon-file"></i>&nbsp;<span translate="rdm.button.SaveSearchQuery" translate-default="Save Search Query"></span>&nbsp;
                    </button>

                    <button name="loadSavedSearchTemplate" class="btn btn-sm btn-primary" ng-if="showSaveSearchQueryButton" ng-click="loadSavedSearchTemplate()">
                        <i class="glyphicon glyphicon-file"></i>&nbsp;<span translate="rdm.button.LoadSaveSearchQuery" translate-default="Your Saved Search Queries"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</form>
