package com.web_forum_backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class Controller {

	private final ThreadRepository threadRepository;
	private final PostRepository postRepository;

    public Controller(ThreadRepository threadRepository, PostRepository postRepository) {
    	this.threadRepository = threadRepository;
    	this.postRepository = postRepository;
    }
    
    @GetMapping("/threads")
    public List<Thread> getThreads() {
        return threadRepository.findAll();
    }
    
    @GetMapping("/thread/{id}")
    public Thread getThread(@PathVariable Long id) {
    	return threadRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    
    @PostMapping("/thread")
    public ResponseEntity createThread(@RequestBody Thread thread) throws URISyntaxException {
        Thread savedThread = threadRepository.save(thread);
        return ResponseEntity.created(new URI("/threads/" + savedThread.getId())).body(savedThread);
    }
    
    @PutMapping("/thread/{id}")
    public ResponseEntity updateThread(@PathVariable Long id, @RequestBody Thread thread) {
    	try {
            Thread threadExists = threadRepository.findById(id).get();
            thread.setId(id);
            threadRepository.save(thread);
            return new ResponseEntity<>(HttpStatus.OK);
    	} catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/thread/{id}")
    public ResponseEntity deleteThread(@PathVariable Long id) {
        threadRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/post/{id}")
    public Post getPost(@PathVariable Long id) {
    	return postRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    
    @GetMapping("/posts/{threadId}")
    public List<Post> getPosts(@PathVariable Long threadId) {
    	int threadIdAsInt = threadId.intValue();
    	return postRepository.getPostsByThread(threadIdAsInt);
    }
    
    @PostMapping("/post")
    public ResponseEntity createPost(@RequestBody Post post) throws URISyntaxException {
        Post savedPost = postRepository.save(post);
        return ResponseEntity.created(new URI("/posts/" + savedPost.getId())).body(savedPost);
    }
    
    @PutMapping("/post/{id}")
    public ResponseEntity updatePost(@PathVariable Long id, @RequestBody Post post) {
    	try {
            Post postExists = postRepository.findById(id).get();
            post.setId(id);
            postRepository.save(post);
            return new ResponseEntity<>(HttpStatus.OK);
    	} catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/post/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
