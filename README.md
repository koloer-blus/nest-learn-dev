# Nest学习

## 基本命令使用

| 命令名称(作用) | 命令用法                 |
| -------------- | ------------------------ |
| 创建项目       | `nest new project-name`  |
| 创建controller | `nest g controller test` |
| 创建service    | `nest g service test`    |
| 创建module     | `nest g module test`     |

## controller（控制器）

![控制器展示图](https://docs.nestjs.com/assets/Controllers_1.png)

控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。

### Request

Request 对象代表 HTTP 请求，并具有查询字符串，请求参数参数，HTTP 标头（HTTP hearder） 和 正文（HTTP body）的属性（在这里阅读更多）。在多数情况下, 不必手动获取它们。 我们可以使用专用的装饰器，比如开箱即用的 @Body() 或 @Query() 。

Nest 为所有标准的 HTTP 方法提供了相应的装饰器：@Put()、@Delete()、@Patch()、@Options()、以及 @Head()。此外，@All() 则用于定义一个用于处理所有 HTTP 请求方法的处理程序。

#### 状态码

我们可以通过在处理函数外添加 @HttpCode（...） 装饰器来自定义响应状态码。

```TypeScript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

#### 路由通配符

```TypeScript
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}

```

路由路径 'ab*cd' 将匹配 abcd 、ab_cd 、abecd 等。字符 ? 、+ 、 * 以及 () 是它们的正则表达式对应项的子集。连字符（-） 和点（.）按字符串路径逐字解析。

### 响应

 操作响应的方法是使用类库特有的响应对象(Response(`express 的 Response对象`))。为了注入特定的响应对象，我们需要使用 @Res() 装饰器。

## 提供者(Providers)

Nest的`Providers`包含一些基本的类，这些类都可以通过`constructor`注入依赖关系。
`Providers`只是一个用`@Injectable()`装饰器注释的类。

![providers 关系图](https://docs.nestjs.com/assets/Components_1.png)

### 依赖注入

解析依赖关系并将该依赖传递给控制器的构造函数。

```TypeScript
constructor(private readonly catsService: CatsService) {}
```


### 作用域

Provider 通常具有与应用程序生命周期同步的生命周期（“作用域”）。在启动应用程序时，必须解析每个依赖项，因此必须实例化每个提供程序。同样，当应用程序关闭时，每个 provider 都将被销毁。

### 可选提供者

关联变为可选的， provider 不会因为缺少配置导致错误。
要指示 provider 是可选的，在 constructor 的参数中使用 `@Optional()`装饰器。

### 基于属性的注入

> **❗如果您的类没有扩展其他提供者，你应该总是使用基于构造函数的注入。**


可以在属性上使用 `@Inject()` 装饰器。

### 注册提供者

我们可以编辑模块文件（app.module.ts），然后将服务添加到@Module()装饰器的 providers 数组中。

## 模块(module)

模块是具有`@Module()`装饰器的类。 `@Module()` 装饰器提供了元数据，Nest 用它来组织应用程序结构。

![module依赖图](https://docs.nestjs.com/assets/Modules_1.png)

每个 Nest 应用程序至少有一个模块，即根模块。
根模块是 Nest 开始安排应用程序树的地方。
事实上，根模块可能是应用程序中唯一的模块，特别是当应用程序很小时，但是对于大型程序来说这是没有意义的。
在大多数情况下，您将拥有多个模块，每个模块都有一组紧密相关的功能。

`@module()` 装饰器接受一个描述模块属性的对象：

| 模块类型    | 模块详情                                                   |
| ----------- | ---------------------------------------------------------- |
| providers   | 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 |
| controllers | 必须创建的一组控制器                                       |
| imports     | 导入模块的列表，这些模块导出了此模块中所需提供者           |
| exports     | 由本模块提供并应在其他模块中可用的提供者的子集。           |


### 功能模块

我们需要做的一件事是将这个模块导入根模块 (ApplicationModule)。

### 共享模块

在 Nest 中，默认情况下，模块是单例，因此您可以轻松地在多个模块之间共享同一个提供者实例。

![](https://docs.nestjs.com/assets/Shared_Module_1.png)

实际上，每个模块都是一个共享模块。一旦创建就能被任意模块重复使用。

### 依赖注入

提供者也可以注入到模块(类)中。

### 动态模块

Nest 模块系统包括一个称为动态模块的强大功能。
此功能使您可以轻松创建可自定义的模块，这些模块可以动态注册和配置提供程序。

> forRoot() 可以同步或异步（Promise）返回动态模块。


此模块 Connection 默认情况下（在 @Module() 装饰器元数据中）定义提供程序，但此外-根据传递给方法的 entities 和 options 对象 forRoot() -公开提供程序的集合，例如存储库。
请注意，动态模块返回的属性扩展（而不是覆盖）@Module() 装饰器中定义的基本模块元数据。
这就是从模块导出静态声明的 Connection 提供程序和动态生成的存储库提供程序的方式。

如果要在全局范围内注册动态模块，请将 global 属性设置为 true。