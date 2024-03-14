// IUserService.java
package com.example.US.model;

import com.example.US.repository.User;

import java.util.List;

public interface IUserService {
        void addUsers(List<User> users);

        User addUser(User user);

        List<User> getUsers();

        User updateUsers(User user, Long id);

        User getUserById(Long id);

        void deleteUser(Long id);
}
