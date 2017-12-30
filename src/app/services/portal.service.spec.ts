import { TestBed, inject } from '@angular/core/testing';

import { PortalBusService } from './portal-bus.service';

describe('PortalBusService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PortalBusService]
		});
	});

	it('should be created', inject([PortalBusService], (service: PortalBusService) => {
		expect(service).toBeTruthy();
	}));
});
