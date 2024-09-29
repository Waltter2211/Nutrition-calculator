import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:4000',
    generates: {
        './src/types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            /* config: {
                mappers: {
                    User: './src/models/user.ts',
                    NutrientCard: './src/models/nutrientCard.ts',
                    Food: './src/models/food.ts',
                    dailyNutrients: './src/models.ts#DailyNutrients'
                }
            } */
        },
    }
};

export default config;