import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { CreateUserInput } from './dto/crear.user.dto';

@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDTO)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.createUser(input);
  }

  @Query(() => [UserDTO])
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => UserDTO, { nullable: true })
  async getUserById(@Args('id') id: string) {
    return this.usersService.findById(id);
  }
}
