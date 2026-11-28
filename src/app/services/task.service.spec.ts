import { TestBed } from "@angular/core/testing";
import { TaskService } from "./task.service"


describe('Test the Task Serivice', () => {
    let service: TaskService;

    beforeEach(() => {
        spyOn(Storage.prototype, 'getItem').and.returnValue(null);
        spyOn(Storage.prototype, 'setItem')
        TestBed.configureTestingModule({})
        service = TestBed.inject(TaskService);
    })

    it("should start with default values", () => {
        expect(service.tasks()).toEqual([])
        expect(service.loading()).toBe(false);
        expect(service.error()).toBeNull();
    })

    it("should not add invalid tasks ", () => {
        const result = service.addTask("");
        expect(service.error()).toBeTruthy();
        expect(result).toBe(false);
    })
    it("Should add valid tasks", () => {
        const result = service.addTask("task1");
        expect(result).toBe(true);
        expect(service.tasks().length).toBe(1);
    })
})