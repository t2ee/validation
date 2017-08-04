<p align="center">
    <a href="//t2ee.org">
        <img width="200" src="//t2ee.org/img/logos/t2ee.png">
    </a>
</p>
<p align="center">
    <a href="//validation.t2ee.org">
        <img width="200" src="//t2ee.org/img/logos/validation.png">
    </a>
</p>

<p align="center">
    <a href="https://travis-ci.org/t2ee/validation">
        <img src="https://img.shields.io/travis/t2ee/validation/master.svg?style=flat-square">
    </a>
    <a href="https://coveralls.io/r/t2ee/validation?branch=master">
        <img src="https://img.shields.io/coveralls/t2ee/validation/master.svg?style=flat-square">
    </a>
</p>

# Introducation

This library fully uses the advantages of decorators, make it smooth to write validation rules.

For detailed introductions and examples, please visit [validation.t2ee.org](//validation.t2ee.org).


# Installation

`npm i reflect-metadata @t2ee/core @t2ee/validation -S`

# Example usage with [@t2ee/vader](https://github.com/t2ee/vader)

```typescript
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
```

