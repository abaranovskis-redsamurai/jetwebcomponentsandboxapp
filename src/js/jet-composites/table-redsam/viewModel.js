/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojtable', 'ojs/ojcollectiontabledatasource',
     'ojs/ojpagingcontrol','ojs/ojpagingtabledatasource'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;

        self.restBackEndUrl = ko.observable();
        self.keyVal = ko.observable();
        self.pageSize = ko.observable();

        self.createModel = function () {
            var ModelData = oj.Model.extend({
                urlRoot: self.restBackEndUrl(),
                idAttribute: self.keyVal()
            });

            return new ModelData();
        };

        self.createCollection = function () {
            var CollectionData = oj.Collection.extend({
                url: self.restBackEndUrl(),
                fetchSize: self.pageSize(),
                model: this.createModel()
            });

            return new CollectionData();
        };

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here
            self.restBackEndUrl(self.properties.restbackendurl);
            self.keyVal(self.properties.keyval);
            self.pageSize(self.properties.pagesize);
            self.tableColumns = self.properties.columns;

            self.listData = self.createCollection();
            self.pagingDatasource = ko.observable(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.listData)));
        });

        self.testMethod = function(param) {
          console.log('Test method call: ' + param);
        }

        self.rowSelectionListener = function (event) {
          var selectedKey = event.detail.value[0].startKey.row;
          console.log('Selected key hanlding inside component: ' + selectedKey);

          var params = {
            'bubbles': true,
            'detail': {'value': selectedKey}
          };
          self.composite.dispatchEvent(new CustomEvent('handleSelection', params));
        };
    };

    //Lifecycle methods - uncomment and implement if necessary
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});
