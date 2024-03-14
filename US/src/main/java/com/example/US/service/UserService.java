// UserService.java
package com.example.US.service;

import com.example.US.exception.UserAlreadyExistsException;
import com.example.US.exception.UserNotFoundException;
import com.example.US.model.IUserService;
import com.example.US.repository.User;
import com.example.US.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;

    @Override
    public void addUsers(List<User> users) {
        userRepository.saveAll(users);
    }

    @Override
    public User addUser(User user) {
        if (userAlreadyExists(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUsers(User user, Long id) {
        return userRepository.findById(id)
                .map(st -> {
                    st.setName(user.getName());
                    st.setEmail(user.getEmail());
                    st.setMobile(user.getMobile());
                    return userRepository.save(st);
                })
                .orElseThrow(() -> new UserNotFoundException("Sorry, user not found"));
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Sorry, user not found by this ID: " + id));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    private boolean userAlreadyExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
