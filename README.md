# Nest学习

## 基本命令使用

| 命令名称(作用) | 命令用法                 |
| -------------- | ------------------------ |
| 创建项目       | `nest new project-name`  |
| 创建controller | `nest g controller test` |

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