package com.web_forum_backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	@Query("SELECT p FROM Post p WHERE p.threadId=:threadId")
	List<Post> getPostsByThread(@Param("threadId") int threadId);
}
