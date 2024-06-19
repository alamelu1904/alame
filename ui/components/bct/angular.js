<div id="previewDetails" class="modal-body ng-scope" ng-style="{'height': modalHeightNew(), 'overflow-y': 'auto'}">
    <div class="form-group">
        <div>
            <p ng-bind-html="record.emailContentDetails.greeting"></p>
            <p ng-bind-html="record.content | sanitize"></p>
        </div>
        <br/><br/>Trade Details<br/><br/>
        <table width="60%" class="table-bordered" ng-if="record.nearMatchInBlock">
            <tr ng-repeat="blocks in record.blockDetails track by $index" ng-style="{'font-weight': ($index==2 && blockHighlights[$index]) ? 'bold' : ''}">
                <td ng-repeat="block in blocks track by $index" ng-style="{'color': ($index==2 && blockHighlights[$index]) ? 'red' : ''}">
                    <span>{{block}}</span>
                </td>
            </tr>
        </table>
        <table width="30%" ng-if="record.nearMatchInBlock">
            <tr ng-repeat="blocks in record.blockDetails track by $index" ng-style="{'display': table}">
                <td ng-repeat="block in blocks track by $index" ng-style="{'font-weight': ($index==2) ? 'bold' : ''}">
                    <span>{{block}}</span>
                </td>
            </tr>
        </table>
        <div ng-if="record.allocationDetails.length>0 && ((record.SSCInvestmentType=='TRPO' || record.SSCInvestmentType=='XYZ'))">
            <br/><br/>Allocation Details<br/><br/>
            <table class="table table-striped table-bordered">
                <tr ng-repeat="allocation in record.allocationDetails track by $index" ng-style="{'font-weight': (record.sensitiveAccount == true || $index==0) ? 'bold' : ''}">
                    <td ng-repeat="allocation in allocations track by $index" ng-style="{'text-align': 'center', 'vertical-align': 'center'}">
                        <span>{{allocation}}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div ng-if="record.mktShpelist.length>0">
            <br/><br/>Market Shape Details<br/><br/>
            <table class="table table-striped table-bordered">
                <tr ng-repeat="mktShpe in record.mktShpeList track by $index" ng-style="{'font-weight': (record.sensitiveAccount == true || $index==0) ? 'bold' : ''}">
                    <td ng-repeat="mktShpeItem in mktShpe track by $index" ng-style="{'text-align': 'center', 'vertical-align': 'center'}">
                        <span>{{mktShpeItem}}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div ng-if="record.mktShtpeList.length">
    <br/><br/>Market Shape Details<br/><br/>
    <table class="table-bordered">
        <tr ng-repeat="mktShtpe in record.mktShtpeList track by $index" ng-style="{'font-weight': (record.sensitiveAccount == true || $index==0) ? 'bold' : ''}" ng-if="record.dynamicColumnLayout">
            <td>
                <span>{{mktShtpe}}</span>
            </td>
        </tr>
    </table>
</div>

<div ng-if="record.alcnList.length">
    <br/><br/>Allocation Details<br/><br/>
    <table class="table-bordered">
        <tr ng-repeat="allocation in record.alcnList track by $index" ng-style="{'font-weight': (record.sensitiveAccount == true || $index==0) ? 'bold' : ''}" ng-if="record.dynamicColumnLayout">
            <td>
                <span>{{allocation}}</span>
            </td>
        </tr>
    </table>
</div>

<div ng-if="record.ctrlList.length">
    <br/><br/>Collateral Details<br/><br/>
    <table class="table-bordered">
        <tr ng-repeat="collateral in record.ctrlList track by $index" ng-style="{'font-weight': (record.sensitiveAccount == true || $index==0) ? 'bold' : ''}" ng-if="record.dynamicColumnLayout">
            <td>
                <span>{{collateral}}</span>
            </td>
        </tr>
    </table>
</div>

<div ng-if="record.nearMatchAllocation">
    <br/><br/>Near Match Allocation Details<br/><br/>
    <table class="table-bordered">
        <tr ng-repeat="nearMatchAllocation in record.nearMatchAllocationList track by $index" ng-style="{'font-weight': (record.sensitiveAccount == true || $index==0) ? 'bold' : ''}" ng-if="record.dynamicColumnLayout">
            <td>
                <span>{{nearMatchAllocation}}</span>
            </td>
        </tr>
    </table>
</div>

<div ng-bind-html="record.emailContentDetails.signature | sanitize"></div>

<div class="modal-footer" style="padding: 5px 20px">
    <button type="button" class="btn-primary" name="close">
        <span translate="btn.button.close">Close</span>
    </button>
</div>


<div>
    <predefinedRecords class="modal-body ng-scope" ng-init="module(getData)" cover("my", "date")>
        <div class="modal-header">
            <h3 class="modal-title">{{ record.communicationDetail.greeting }}</h3>
        </div>
        <div class="modal-body">
            <h4>Record Details</h4>
            <table border="1" class="table-bordered">
                <tr>
                    <th ng-if="record.nearMatchTracker.length">Block ID</th>
                    <td ng-if="record.nearMatchTracker.length" ng-repeat="block in record.nearMatchTracker track by $index">{{ block.BlockID }}</td>
                </tr>
                <tr>
                    <th ng-if="record.nearMatchTracker.length">Status</th>
                    <td ng-if="record.nearMatchTracker.length" ng-repeat="block in record.nearMatchTracker track by $index">{{ block.Status }}</td>
                </tr>
            </table>
        </div>
        <div>
            <table>
                <tr ng-if="record.brokerDetails.length > 0">
                    <th>Broker Details</th>
                    <td>
                        <table>
                            <tr ng-repeat="broker in record.brokerDetails track by $index">
                                <th>{{ broker.SSCInvestmentType }}</th>
                                <td>{{ broker.SSCInvestmentType }}</td>
                                <th>{{ broker.ClientDealingDesk }}</th>
                                <td>{{ broker.ClientDealingDesk }}</td>
                                <th>{{ broker.clientExecutingBrokerID }}</th>
                                <td>{{ broker.clientExecutingBrokerID }}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </predefinedRecords>
</div>
