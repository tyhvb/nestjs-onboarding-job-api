import * as Knex from "knex";
import {timestamps} from "../helpers";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('jobs', function (table) {
        table.increments('id');
        table.uuid('uuid').index();
        table.string('title');
        table.string('salary_range').nullable();
        table.string('description').nullable();
        table.string('tags').nullable();
        table.string('company').nullable();
        table.string('company_logo_url').nullable();

        timestamps(knex, table);
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropSchemaIfExists('jobs');
}
