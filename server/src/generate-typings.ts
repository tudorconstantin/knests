import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';


(async function main(){
  try{
    const definitionsFactory = new GraphQLDefinitionsFactory();
    await definitionsFactory.generate({
      typePaths: ['./**/*.graphql'],
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    });
  } catch(e){
    console.trace(`Error:`, e);
  }
})().then( () => console.log(`done`));
