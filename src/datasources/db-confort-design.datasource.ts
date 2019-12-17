import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './db-confort-design.datasource.config.json';

@lifeCycleObserver('datasource')
export class DbConfortDesignDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'DBConfortDesign';

  constructor(
    @inject('datasources.config.DBConfortDesign', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
