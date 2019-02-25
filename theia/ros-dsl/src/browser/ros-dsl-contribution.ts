import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const RosDslCommand = {
    id: 'RosDsl.command',
    label: "Shows a message"
};

@injectable()
export class RosDslCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(RosDslCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class RosDslMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: RosDslCommand.id,
            label: 'Say Hello'
        });
    }
}