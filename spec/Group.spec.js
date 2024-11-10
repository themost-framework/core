import { Group, User } from '@themost/core';
import { TestUtils } from './TestUtils';
import {TestApplication} from './TestApplication';

describe('Group', () => {

    /**
     * @type {import('@themost/data').DataContext}
     */
    let context;
    /**
     * @type {TestApplication}
     */
    let app;
    beforeAll(async () => {
        app = new TestApplication();
        context = app.createContext();
    });

    afterAll(async () => {
        if (context) {
            await context.finalizeAsync();
        }
        if (app) {
            await app.finalizeAsync();
        }

    });

    it('should create group', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            const Groups = context.model(Group).silent();
            await Groups.save({
                name: 'Employees',
                alternateName: 'employees',
                description: 'Employees group'
            });
            const group = await Groups.where((x) => x.name === 'Employees').getItem();
            expect(group).toBeTruthy();
            expect(group.name).toBe('Employees');
        });
    });

    it('should delete group', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            const Groups = context.model(Group).silent();
            await Groups.save({
                name: 'Employees',
                alternateName: 'employees',
                description: 'Employees group'
            });
            let group = await Groups.where((x) => x.name === 'Employees').getItem();
            expect(group).toBeTruthy();
            await Groups.remove(group);
            group = await Groups.where((x) => x.name === 'Employees').getItem();
            expect(group).toBeFalsy();
        });
    });

    it('should add user to group', async () => {
        await TestUtils.executeInTransaction(context, async () => {
                const Groups = context.model(Group);
                const Users = context.model(User);
                await Groups.save({
                    name: 'Employees',
                    alternateName: 'employees',
                    description: 'Employees group'
                });
                await Users.save({
                    name: 'mary.evans',
                    description: 'Mary Evans',
                    groups: [{
                        name: 'Employees'
                    }]
                });
                const user = await Users.where(
                    (x) => x.name === 'mary.evans'
                    ).expand((x) => x.groups).getItem()
                expect(user).toBeTruthy();
                expect(user.groups).toBeTruthy();
                expect(user.groups.length).toBe(1);
                const group = await Groups.where((x) => x.name === 'Employees').getTypedItem();
                await group.removeUserAsync(user);
        });
    });

});
