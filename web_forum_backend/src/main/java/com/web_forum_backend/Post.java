package com.web_forum_backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String post;
	private String userName;
	private int threadId;
	
	public Post() {}
	
	public Post(Long id, 
			String userName, 
			String post,
			int threadId) {
		this.id = id;
		this.userName = userName;
		this.post = post;
		this.threadId = threadId;
	}
	
    public Long getId() {
        return id;
    }
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getPost() {
		return this.post;
	}
	
	public void setPost(String post) {
		this.post = post;
	}
	
	public String getUserName() {
		return this.userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public int getThreadId() {
		return this.threadId;
	}
	
	public void setThreadId(int threadId) {
		this.threadId = threadId;
	}
}
