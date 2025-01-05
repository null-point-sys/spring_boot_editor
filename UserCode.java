// GreetingController.java
// { autofold
package com.yourself;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;


//}
@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name") String name) {
        return new Greeting(counter.incrementAndGet(),
                "");
    }



}


// Greeting.java
package com.yourself;

public class Greeting {

    public Greeting() {
    }

    public void setId(long id) {
        this.id = id;
    }

    private  long id;
    private  String content;

    public Greeting(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }


    public void setContent(String content) {
       this.content=content;
    }
}