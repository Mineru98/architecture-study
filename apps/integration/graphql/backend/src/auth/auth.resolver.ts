import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String, { nullable: true })
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string | null> {
    const result = await this.authService.login(email, password);
    if (!result) return null;
    return JSON.stringify(result);
  }

  @Query(() => String, { nullable: true })
  async me(@Args('token') token: string): Promise<string | null> {
    const user = await this.authService.me(token);
    if (!user) return null;
    return JSON.stringify(user);
  }
}
