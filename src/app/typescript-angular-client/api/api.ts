export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './contentController.service';
import { ContentControllerService } from './contentController.service';
export * from './salesReportController.service';
import { SalesReportControllerService } from './salesReportController.service';
export const APIS = [BasicErrorControllerService, ContentControllerService, SalesReportControllerService];
