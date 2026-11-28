import { validateTaskTitle, filterTasks } from "./task.utils";
import { Task } from '../models/task.model';

describe("Validate task title", () => {
    it("Should return an error when task title is empty or white space", () => {
        //Arrange
        const title = '';
        // Act
        const result = validateTaskTitle(title);
        //Assert
        expect(result)?.toBe("Task title is required.")
    })
    it("Should return an error when task title is white space", () => {
        //Arrange
        const title = '    ';
        // Act
        const result = validateTaskTitle(title);
        //Assert
        expect(result)?.toBe("Task title is required.")
    })
})

describe("Validate Filter Tasks", () => {
    const sampleTasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false, priority: 'low', createdAt: '2026-01-01' },
        { id: '2', title: 'Task 2', completed: true, priority: 'high', createdAt: '2026-01-02' },
    ];

    it("Should should return only active tasks when filter is active", () => {
        const result = filterTasks(sampleTasks, 'active')
        const isOne = result?.length;
        const iscompleted = result[0]?.completed;
        expect(isOne).toBe(1)
        expect(iscompleted).toBe(false)
    })
})