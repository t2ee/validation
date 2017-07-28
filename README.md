# Introducation
this library uses [@t2ee/core](https://github.com/t2ee/core) to manage all dependency injections

You should install `reflect-metadata` and import it in your top level file (bring your own `reflect-metadata`).

# Example

## Example usage with [@t2ee/vader](https://github.com/t2ee/vader)

```typescript
import {
    Router,
    POST,
    Body,
    Response,
    Path,
} from '@t2ee/vader';
import {
    Valid,
    NotNull,
    Min,
} from '@t2ee/validation';
import Koa from 'koa';
const router = Router.newInstance();

class Message {
    @NotNull
    @Min(4)
    message: string;
}

@Path('/')
@Component
class Controller {

    @POST
    @Path('/say')
    say(@Valid @Body message: Message) {
        // message should be at least 4 characters long
    }
}

router.use(Controller);
const app = new Koa();
app.use(router.routes());
app.listen(8080);
```

## Example custom rule

```typescript
import {
    Rule,
    ValidationRule,
    CustomRule,
} from '@t2ee/validation';
import {
    AutoWireMeta,
} from '@t2ee/core';

const IsGender = CustomRule('IsGender', `shuold be either 'male' or 'female'`);

@ValidationRule('IsGender')
class IsGenderRule implements Rule {
    validate(value: any, parameter: any, meta: AutoWireMeta, args: any[]): boolean {
        return value === 'male' || value === 'female';
    }
}

```
