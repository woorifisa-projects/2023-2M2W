package woorifisa.goodfriends.backend.product.domain;

import woorifisa.goodfriends.backend.global.common.BaseTimeEntity;
import woorifisa.goodfriends.backend.user.domain.User;

import javax.persistence.*;

@Table(name = "orders")
@Entity
public class Order extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // 외래 키로 사용할 컬럼 지정
    private User user;

    @Column(nullable = false)
    private String possibleDate;

    @Column(nullable = false)
    private String possibleTime;

    private String requirements;

    public Order() {
    }

    public Order(Long id, Product product, User user, String possibleDate, String possibleTime, String requirements) {
        this.id = id;
        this.product = product;
        this.user = user;
        this.possibleDate = possibleDate;
        this.possibleTime = possibleTime;
        this.requirements = requirements;
    }

    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public User getUser() {
        return user;
    }

    public String getPossibleDate() {
        return possibleDate;
    }

    public String getPossibleTime() {
        return possibleTime;
    }

    public String getRequirements() {
        return requirements;
    }

}
